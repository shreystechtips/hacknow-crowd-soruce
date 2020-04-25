import vision from "@react-native-firebase/ml-vision";

export async function processDocument(localPath) {
  const processed = await vision().cloudDocumentTextRecognizerProcessImage(
    localPath
  );

  console.log("Found text in document: ", processed.text);

  processed.blocks.forEach((block) => {
    console.log("Found block with text: ", block.text);
    console.log("Confidence in block: ", block.confidence);
    console.log("Languages found in block: ", block.recognizedLanguages);
  });
}
