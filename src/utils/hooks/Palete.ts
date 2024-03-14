// Função para extrair cores de uma imagem base64
export function extrairCores(base64String) {
  // Converter a string base64 para uma imagem
  const imagem = new Image();
  imagem.src = base64String;

  // Criar um canvas para desenhar a imagem
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Quando a imagem estiver carregada
  imagem.onload = function() {

      // Obter os dados de pixels da imagem
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Objeto para contar as cores presentes na imagem
      const cores = {};

      // Percorrer os pixels da imagem
      for (let i = 0; i < pixels.length; i += 4) {
          // Obter a cor RGB do pixel
          const cor = `rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`;
          console.log(cor)
          // Incrementar o contador de ocorrências dessa cor
          cores[cor] = (cores[cor] || 0) + 1;
      }
      console.log(cores)
      // Ordenar as cores por ocorrência
      const coresOrdenadas = Object.keys(cores).sort((a, b) => cores[b] - cores[a]);

      // Retornar as 5 cores mais presentes em hexadecimal
      const coresHex = coresOrdenadas.slice(0, 5).map(corRGBToHex);

      console.log('Cores mais presentes:', coresHex,coresOrdenadas,cores);
  };
}

// Função para converter uma cor RGB para hexadecimal
function corRGBToHex(corRGB) {
  // Extrair os valores RGB da string
  const [r, g, b] = corRGB.match(/\d+/g);

  // Converter para hexadecimal e retornar
  return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
}
