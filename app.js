// Function that returns a promise that resolves after a timeout
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Async function that uses await with the timeout function
async function runWithTimeout() {
    console.log('Waiting for 3 seconds...');
    
    // Wait for the timeout to complete
    await timeout(3000); // Wait for 3000 milliseconds (3 seconds)
    
    console.log('3 seconds have passed!');
}

// Call the async function
runWithTimeout();
