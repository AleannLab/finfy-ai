"use client";
export const createWavFile = async (audioChunks: BlobPart[]) => {
  const blob = new Blob(audioChunks, { type: "audio/wav" });
  const arrayBuffer = await blob.arrayBuffer();
  const view = new DataView(arrayBuffer);

  const header = new ArrayBuffer(44);
  const headerView = new DataView(header);

  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const dataSize = view.byteLength;
  const fileSize = 36 + dataSize;

  headerView.setUint32(0, 1380533830, false);
  headerView.setUint32(4, fileSize, true);
  headerView.setUint32(8, 1463899717, false);

  headerView.setUint32(12, 1718449184, false);
  headerView.setUint32(16, 16, true);
  headerView.setUint16(20, 1, true);
  headerView.setUint16(22, numChannels, true);
  headerView.setUint32(24, sampleRate, true);
  headerView.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true);
  headerView.setUint16(32, numChannels * bitsPerSample / 8, true);
  headerView.setUint16(34, bitsPerSample, true);

  headerView.setUint32(36, 1684108385, false);
  headerView.setUint32(40, dataSize, true);

  const wavArray = new Uint8Array(header.byteLength + arrayBuffer.byteLength);
  wavArray.set(new Uint8Array(header), 0);
  wavArray.set(new Uint8Array(arrayBuffer), header.byteLength);

  return new Blob([wavArray], { type: "audio/wav" });
};
