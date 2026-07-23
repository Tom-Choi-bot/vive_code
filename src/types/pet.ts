export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat";
  breed?: string;
  birthDate?: string;
  emoji?: string;
  photoBase64?: string;
}
