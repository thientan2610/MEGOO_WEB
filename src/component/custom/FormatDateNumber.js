export const formatDate = (dateISO) => {
  return new Date(dateISO).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDatetime = (dateISO) => {
  return new Date(dateISO).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (total) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return VND.format(total);
}

export const compareTimes = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    return false;
  } else if (date1 > date2) {
    return true;
  } else {
    return false;
  }
};

export const compareEqualTimes = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 === date2) {
    return true;
  } else {
    return false;
  }
}