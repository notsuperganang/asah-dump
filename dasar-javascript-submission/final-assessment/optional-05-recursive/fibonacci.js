function fibonacci(n) {
  // Base cases
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }
  
  // Recursive case: get the previous fibonacci sequence
  const prevSequence = fibonacci(n - 1);
  
  // Calculate the next fibonacci number by adding the last two numbers
  const nextFib = prevSequence[prevSequence.length - 1] + prevSequence[prevSequence.length - 2];
  
  // Return the sequence with the new fibonacci number added
  return [...prevSequence, nextFib];
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
