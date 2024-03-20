export async function fetchPokemonImage(pokemonNum: string): Promise<string> {
  try {
    let apiUrl = "";
    if (!Number.isNaN(parseInt(pokemonNum))) {
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNum}`;
    } else {
      const randomNum = Math.floor(Math.random() * 1024) + 1;
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    }
    console.log(apiUrl);

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch the Pokemon data: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    const imageUrl = data.sprites.front_default;

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      throw new Error(
        `Failed to fetch the image: ${imageRes.status} ${imageRes.statusText}`
      );
    }
    const imageBlob = await imageRes.blob();
    const imageArrayBuffer = await imageBlob.arrayBuffer();
    const image = new Uint8Array(imageArrayBuffer);
    const b64Data = btoa(String.fromCharCode(...image));
    const size = image.length;

    return `\x1b]1337;File=inline=1;size=${size}:${b64Data}\x07`;
  } catch (error) {
    return `Error: ${error}`;
  }
}
