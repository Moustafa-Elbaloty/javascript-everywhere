export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function pretendToSave(title: string): Promise<void> {
  await sleep(600);

  if (title.trim().toLowerCase() === "fail") {
    throw new Error("The server rejected this task. Try a different title.");
  }
}
