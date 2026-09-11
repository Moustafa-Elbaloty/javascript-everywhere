const score = 45;

if (score < 0 || score > 100) {
    console.log("Invalid score");
} else if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else if (score >= 60) {
    console.log("D");
} else {
    console.log("F");
}
//  95, 85, 75, 65, 45 
const scoreé = 75;

const result = scoreé >= 60 ? "pass" : "fail";

console.log(result);

// because it is harder to read.

const grade = "B";

switch (grade) {
    case "A":
        console.log("Excellent");
        break;

    case "B":
        console.log("Very Good");
        break;

    case "C":
        console.log("Good");
        break;

    case "D":
        console.log("Pass");
        break;

    case "F":
        console.log("Fail");
        break;

    default:
        console.log("Invalid grade");
}

const score1 = 55;
const attendance = 85;
// const score = 75;
// const attendance = 85;

if (score1 >= 70 && attendance >= 80) {
    console.log("Certificate awarded");
}

if (score1 < 60 || attendance < 50) {
    console.log("Review needed");
}