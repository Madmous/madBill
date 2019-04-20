export default (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`${key} is not configured`);
  }

  return value;
};
