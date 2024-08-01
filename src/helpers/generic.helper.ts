import crypto from 'crypto';

export class GenericHelper {
    static generateId(): string {
      return crypto.randomUUID().replace(/-/g, '');
      
    }
    static  generateComplexPassword(length = 12): string {
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      
      const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
      
      let password = '';
      
      // Ensure at least one character from each set
      password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
      password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
      password += numberChars[Math.floor(Math.random() * numberChars.length)];
      password += specialChars[Math.floor(Math.random() * specialChars.length)];
      
      // Fill the rest of the password
      for (let i = password.length; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * allChars.length);
          password += allChars[randomIndex];
      }
      
      // Shuffle the password
      return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  // utils/tokenHelper.ts
static generateRandomAlphanumeric = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
  }
  return result;
};


static generateToken = (): string => {
  const randomString = GenericHelper.generateRandomAlphanumeric(8); // Adjust length as needed
  return `MHOLD-${randomString}`;
};

}