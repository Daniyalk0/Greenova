export default function generatePassword(length = 8): string {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters");
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+";
  const all = upper + lower + numbers + special;

  // Ensure at least one of each
  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle so required chars aren’t predictable
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
