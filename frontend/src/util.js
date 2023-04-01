export function changeElementColor(elementId, color, bColor) {
  console.log(elementId)
  var element = document.getElementById(elementId);
  console.log(element)
  // element.style.color = color;
  // element.style.backgroundColor = bColor;
}

export function listToString(list, name) {
  var string = '';

  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (index === 0) {
      string = element[name].toString();
    }
    else {
      string = string + ', ' + element[name].toString();
    }
  }
  return string;
}

export const capitalizeFirstLowercaseRest = (str) => {
  return (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );
};

export const filterStringDecoder = (filterString) => {
  if (filterString) {
    const [sortString, orderString, genresString, releaseDateString, languageString, rateString, runtimeString] = filterString.split("&")
    const [, sort] = sortString.split("=")
    const [, order] = orderString.split("=")
    const [, genres] = genresString.split("=")
    const [, releaseDate] = releaseDateString.split("=")
    const [startDate, endDate] = releaseDate.split("to")
    const [, language] = languageString.split("=")
    const [, rate] = rateString.split("=")
    const [minRate, maxRate] = rate.split("to")
    const [, runtime] = runtimeString.split("=")
    const [minRuntime, maxRuntime] = runtime.split("to")
    return {
      sort: sort,
      order: order,
      genres: genres,
      startDate: startDate,
      endDate: endDate,
      language: language,
      minRate: minRate,
      maxRate: maxRate,
      minRuntime: minRuntime,
      maxRuntime: maxRuntime
    }
  }

  return "";
}

export const filterStringEncoder = (media_type, sort, order, startDate, endDate, language, rate, runtime, genresChecked) => {
  var result = "/ranking/" + media_type + "/1/sort=" + sort;
  result = result + "&order=" + order;
  var genresString = ""
  var flag = false
  for (var i in genresChecked) {
    if (genresChecked[i]) {
      flag = true
      genresString = genresString + "and" + i
    }
  }
  if (flag) {
    result = result + "&genres=" + genresString.slice(3);
  }
  else {
    result = result + "&genres=";
  }
  if (!startDate) {
    startDate = ""
  }
  if (!endDate) {
    endDate = ""
  }
  result = result + "&releasedate=" + startDate + "to" + endDate;
  if (language === "xx") {
    language = ""
  }
  result = result + "&language=" + language;
  result = result + "&rate=" + rate[0] + "to" + rate[1];
  result = result + "&runtime=" + runtime[0] + "to" + runtime[1];
  return result
}

export const filterAPIEncoder = (filter) => {
  var result = "";
  if (filter.sort) {
    result = result + "&sort=" + filter.sort
  }
  if (filter.order) {
    result = result + "&order=" + filter.order
  }
  if (filter.genres) {
    result = result + "&genres=" + filter.genres
  }
  if (filter.startDate) {
    result = result + "&startDate=" + filter.startDate
  }
  if (filter.endDate) {
    result = result + "&endDate=" + filter.endDate
  }
  if (filter.language) {
    result = result + "&language=" + filter.language
  }
  if (filter.minRate) {
    result = result + "&minRate=" + filter.minRate
  }
  if (filter.maxRate) {
    result = result + "&maxRate=" + filter.maxRate
  }
  if (filter.minRuntime) {
    result = result + "&minRuntime=" + filter.minRuntime
  }
  if (filter.maxRuntime) {
    result = result + "&maxRuntime=" + filter.maxRuntime
  }
  return result;
}

export const dateFormatter = (dateInput) => {
  var date = new Date(dateInput).getDate()
  var month = new Date(dateInput).getMonth()
  var year = new Date(dateInput).getFullYear()
  if (date < 10) {
    date = "0" + date
  }
  if (month < 10) {
    month = "0" + (month + 1)
  }
  if (`${date}-${month}-${year}` === `01-01-1970`) {
    return ''
  }
  return `${date}-${month}-${year}`
}

// input is 2021-01-10T21:40:01Z format
export const dateTimeFormatter = (input) => {
  let date = new Date(input);

  let day = date.getUTCDate().toString().padStart(2, '0');
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  let year = date.getUTCFullYear().toString();
  let hours = date.getUTCHours().toString().padStart(2, '0');
  let minutes = date.getUTCMinutes().toString().padStart(2, '0');

  let output = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
  return output;
}

// Output is 2021-01-10T21:40:01Z format
export const currentTime = () => {
  const now = new Date();
  const isoString = now.toISOString();
  const formattedString = isoString.substring(0, isoString.length - 5) + "Z";
  return formattedString;
}

// divide a list into several sublists with size of n
export const divideList = (list, n) => {
  var result = []
  for (var i = 0; i < list.length; i += n) {
    result.push(list.slice(i, i + n))
  }
  return result
}