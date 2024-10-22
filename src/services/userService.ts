// src/services/userService.ts
export async function getUserInfo() {
  // Fetch user info from your API or local storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  return userInfo;
}
