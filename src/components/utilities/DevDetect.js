// import process from "process";

export default function isDev(){

  const development = typeof window !== `undefined` && window.location.hostname === 'localhost';
  return development;
}