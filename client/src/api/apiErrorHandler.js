// Simple error handling function

export function handleError(error) {
  if (error.name === "AbortError") {
    console.log("Fetch aborted:", error.message);
  } else {
    console.error("API call failed:", error.message);
    throw error;
  }
}
