export const codeIsCorrect = (code: string, codeInEnv: string) =>
  code.toLowerCase() === codeInEnv.toLowerCase();
