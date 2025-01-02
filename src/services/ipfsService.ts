import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: 'YOUR_WEB3_STORAGE_TOKEN' });

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    const cid = await client.put([file]);
    return cid;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

export async function retrieveFromIPFS(cid: string): Promise<any> {
  try {
    const res = await client.get(cid);
    if (!res?.ok) {
      throw new Error(`Failed to get ${cid}`);
    }
    const files = await res.files();
    return files[0];
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw error;
  }
}