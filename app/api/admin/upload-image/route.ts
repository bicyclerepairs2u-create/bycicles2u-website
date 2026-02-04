import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createStagedUploads } from '@/lib/shopify/admin'

// Verify admin session
async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) return false

  try {
    const decoded = Buffer.from(session.value, 'base64').toString()
    const [prefix, timestamp] = decoded.split(':')

    if (prefix !== 'admin') return false

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - parseInt(timestamp)
    if (sessionAge > 24 * 60 * 60 * 1000) return false

    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  // Verify authentication
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Get staged upload URLs from Shopify
    const fileInfos = files.map((file) => ({
      filename: file.name,
      mimeType: file.type || 'image/jpeg',
      fileSize: file.size,
    }))

    const stagedTargets = await createStagedUploads(fileInfos)

    // Upload each file to its staged URL
    const uploadedUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const target = stagedTargets[i]

      // Build form data for upload
      const uploadFormData = new FormData()
      target.parameters.forEach((param) => {
        uploadFormData.append(param.name, param.value)
      })
      uploadFormData.append('file', file)

      // Upload to Shopify
      const uploadResponse = await fetch(target.url, {
        method: 'POST',
        body: uploadFormData,
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error(`Upload failed for ${file.name}:`, errorText)
        throw new Error(`Failed to upload ${file.name}`)
      }

      uploadedUrls.push(target.resourceUrl)
    }

    return NextResponse.json({ urls: uploadedUrls })
  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to upload images',
      },
      { status: 500 }
    )
  }
}
