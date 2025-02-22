// THIS IS JUST DEMO SCORING SYSTEM WORK ON IMPROVING THIS!
export function calculateScore(distance) {
    const maxScore = 5000; // Maximum score
    const decayFactor = 0.1; // Adjust this to fine-tune the curve

    // Exponential decay formula
    let score = maxScore * Math.exp(-decayFactor * distance);

    // Slight penalty for "perfect" guesses within 0.3 km
    if (distance <= 0.3) {
        score -= 40; // Penalize slightly for perfect guesses
    }

    // Ensure score is an integer and within valid range
    return Math.max(Math.round(score), 0);
}
