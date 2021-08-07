function normalizeWord(word) {
  let letters = [
      {
        search: "áäàãâ",
        replace: "a",
      },
      {
        search: "éëèê",
        replace: "e",
      },
      {
        search: "íïìî",
        replace: "i",
      },
      {
        search: "óöòõô",
        replace: "o",
      },
      {
        search: "úüùû",
        replace: "u",
      },
      {
        search: "ñ",
        replace: "n",
      },
      {
        search: "ç",
        replace: "c",
      },
    ],
    normal;

  // Convertimos la palabra a minusculas
  normal = word.toLowerCase();

  // Por cada "letra"
  $.each(letters, function (idx, letter) {
    var re = new RegExp("[" + letter.search + "]", "g");
    // Reemplazamos el caracter acentuado
    normal = normal.replace(re, letter.replace);
  });

  // Devolvemos un objeto con la palabra original y la normalizada
  return {
    original: word,
    normal: normal,
  };
}

function normalizeWords(words) {
  var response = [];

  // Por cada palabra
  $.each(words, function (idx, word) {
    // Obtenemos la palabra normalizada
    response.push(normalizeWord(word));
  });

  return response;
}

function sortNormalizedWords(a, b) {
  if (a.normal > b.normal) {
    return 1;
  }
  if (a.normal < b.normal) {
    return -1;
  }
  return 0;
}

function sortShortWords(a, b) {
  if (a.length > b.length) {
    return 1;
  }
  if (a.length < b.length) {
    return -1;
  }
  return 0;
}

function select(key) {
  let states = [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Ciudad de México",
      "Coahuila",
      "Colima",
      "Durango",
      "Estado de México",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
      "Michoacán",
      "Morelos",
      "Nayarit",
      "Nuevo León",
      "Oaxaca",
      "Puebla",
      "Querétaro",
      "Quintana Roo",
      "San Luis Potosí",
      "Sinaloa",
      "Sonora",
      "Tabasco",
      "Tamaulipas",
      "Tlaxcala",
      "Veracruz",
      "Yucatán",
      "Zacatecas",
    ],
    // Obtenemos la palabras normalizadas (sin caracteres acentuados)
    words = normalizeWords(states);

  // Ordenamos el arreglo de la A a la Z
  words.sort(sortNormalizedWords);

  let posibles = [];

  if (key.length > 1) {
    // Normalizamos el valor ingresado
    key = normalizeWord(key);

    // Por cada palabra
    $.each(words, function (idx, word) {
      // Validamos que contenga el valor ingresado
      if (word.normal.indexOf(key.normal) !== -1) {
        posibles.push(word.original);
      }
    });

    // Imprimimos todas las palabras que contienen el valor ingresado

    $("#posible").empty();
    for (let i = 0; i < posibles.length; i++) {
      if (
        document.getElementById("posible").className == "posible body-light"
      ) {
        $("#posible").append(
          "<p class='p-posible text-light'>" + posibles[i] + "</p>"
        );
      } else {
        $("#posible").append(
          "<p class='p-posible text-light text-dark'>" + posibles[i] + "</p>"
        );
      }
    }
  } else {
    $("#posible").empty();
  }

  $(".p-posible").click(function (e) {
    let texto = this.innerHTML;
    $("input").val(texto);
    $("#posible").empty();
    findWeather();
    e.preventDefault();
  });
}
