export function TrimString(str: string, num: number) {
    if (!str) {
      return "";
    }
    return str.length > num ? str.substring(0, 20) + "..." : str;
  }