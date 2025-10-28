/**
 * Node.js Face Cropping with 1cm Space
 * Requires: npm install sharp @vladmandic/face-api canvas
 */

const sharp = require("sharp")
const faceapi = require("@vladmandic/face-api")
const canvas = require("canvas")
const fs = require("fs").promises
const path = require("path")

// Setup face-api with canvas
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

async function loadModels() {
  const modelPath = path.join(__dirname, "models")
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)
}

function pxForCm(metadata, cm = 1) {
  // Convert cm to pixels based on DPI
  if (metadata.density && metadata.density > 0) {
    return Math.round((metadata.density / 2.54) * cm)
  }
  // Fallback: 5% of image height
  return Math.round(metadata.height * 0.05)
}

async function cropFacesWithSpace(imagePath, outputDir = "cropped", cmAbove = 1) {
  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata()
    const extraPx = pxForCm(metadata, cmAbove)

    console.log(`Using ${extraPx}px for ${cmAbove}cm space above head`)

    // Load image for face detection
    const img = await canvas.loadImage(imagePath)

    // Detect faces
    const detections = await faceapi.detectAllFaces(img)

    if (detections.length === 0) {
      console.log(`No faces detected in ${imagePath}`)
      return
    }

    // Process each detected face
    for (let i = 0; i < detections.length; i++) {
      const box = detections[i].box

      // Add extra space above head
      const newTop = Math.max(0, box.y - extraPx)

      // Add padding for better framing
      const padW = Math.round(box.width * 0.2)
      const padH = Math.round((box.height + extraPx) * 0.15)

      const left = Math.max(0, box.x - padW)
      const top = newTop
      const width = Math.min(metadata.width - left, box.width + padW * 2)
      const height = Math.min(metadata.height - top, box.height + extraPx + padH)

      // Crop and save
      const baseName = path.basename(imagePath, path.extname(imagePath))
      const outputPath = path.join(outputDir, `${baseName}_face_${i}.jpg`)

      await sharp(imagePath)
        .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
        .jpeg({ quality: 95 })
        .toFile(outputPath)

      console.log(`Saved: ${outputPath}`)
    }
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message)
  }
}

async function batchCropDirectory(inputDir, outputDir = "cropped", cmAbove = 1) {
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true })

  // Get all image files
  const files = await fs.readdir(inputDir)
  const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))

  console.log(`Processing ${imageFiles.length} images...`)

  for (const file of imageFiles) {
    const filePath = path.join(inputDir, file)
    console.log(`\nProcessing: ${file}`)
    await cropFacesWithSpace(filePath, outputDir, cmAbove)
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log("Usage:")
    console.log("  Single image: node face_crop_node.js image.jpg")
    console.log("  Directory: node face_crop_node.js /path/to/images/")
    console.log("  With custom space: node face_crop_node.js image.jpg 1.5")
    process.exit(1)
  }

  const inputPath = args[0]
  const cmSpace = args[1] ? Number.parseFloat(args[1]) : 1.0

  loadModels()
    .then(async () => {
      const stats = await fs.stat(inputPath)

      if (stats.isDirectory()) {
        await batchCropDirectory(inputPath, "cropped", cmSpace)
      } else {
        await fs.mkdir("cropped", { recursive: true })
        await cropFacesWithSpace(inputPath, "cropped", cmSpace)
      }

      console.log("\nDone!")
    })
    .catch(console.error)
}

module.exports = { cropFacesWithSpace, batchCropDirectory }
