export function getRenderPriority(userTier = "free") {
  switch (userTier) {
    case "enterprise":
      return 1;
    case "pro":
      return 5;
    default:
      return 10; // free
  }
}
