const USERSTATUSES = {
  BLOCKED: "BLOCKED",
  ACTIVE: "ACTIVE",
};

const TRANSACTIONSTATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REVERSED: "REVERSED",
};

const TRANSFERSTATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REVERSED: "REVERSED",
};

const ADDRESSSTATUS = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
};

const MESSAGESTATUS = {
  PENDING: "PENDING",
  DELIVERED: "DELIVERED",
  VIEWED: "VIEWED",
  DELETED: "DELETED",
};

const CURRENCYTYPE = {
  NGN: "NGN",
  USD: "USD",
};

const OTPSTATUS = {
  ACTIVE: "ACTIVE",
  USED: "USED",
  EXPIRED: "EXPIRED",
};

const MESSAGES = {
  STATUS500: "An error occured. Please try again or contact customer service",
  TOKENEXPIRED: "Unauthorized. Session timeout",
  INVALIDTOKEN: "An error occurred. Invalid token format",
};

const CALLSTATUS = {
  STARTED: "STARTED",
  ENDED: "ENDED",
  PENDING: "PENDING",
};

const PARTICIPANTSTATUS = {
  ONHOLD: "ONHOLD",
  JOINED: "JOINED",
  LEFT: "LEFT",
  REJECTED: "REJECTED",
  MISSED: "MISSED",
  AWAITING: "AWAITING",
};

const CALLTYPE = {
  SINGLE: "SINGLE",
  GROUP: "GROUP",
};

const MESSAGETYPE = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  LOCATION: "LOCATION",
  CALL: "CALL",
  VIDEO: "VIDEO",
  TRANSFER: "TRANSFER",
  AUDIO: "AUDIO",
};

const NOTIFICATIONSTATUS = {
  READ: "READ",
  PENDING: "PENDING",
};

const OTPTYPE = {
  SIGNUP: "SIGNUP",
  UPDATEPROFILE: "UPDATEPROFILE",
  RESETPASSWORD: "RESETPASSWORD",
};

const TRANSACTIONTYPE = {
  AIRTIME: "AIRTIME",
  TRANSFER: "TRANSFER",
  DATA: "DATA",
  UTILITY: "UTILITY",
  TELEVISION: "TELEVISION",
  INTERNET: "INTERNET",
};

const BILLCATEGORY = {
  AIRTIME: "AIRTIME",
  DATA: "DATA",
  TELEVISION: "TELEVISION",
  UTILITY: "UTILITY",
  INTERNET: "INTERNET",
};

const BILLIMAGES = {
  dstv: "https://sterlinggeneral.blob.core.windows.net/acecoin/855004334737925-image 24(2).png",
  gotv: "https://sterlinggeneral.blob.core.windows.net/acecoin/7252650884611553-image 24(3).png",
  ikedc:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/21989607556954005-image 24(7).png",
  eko: "https://sterlinggeneral.blob.core.windows.net/acecoin/9109926276195912-image 24(6).png",
  smile:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/12274864844960831-image 24smile.png",
  spectranet:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/854127218442166-image 24spec.png",
  swift:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/40570939042657717-image 24.png",
  ipnx: "https://sterlinggeneral.blob.core.windows.net/acecoin/9157277996758362-image 24(1).png",
  mytv: "https://sterlinggeneral.blob.core.windows.net/acecoin/8953535261617911-image 24(4).png",
  startime:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/8973180963513581-image 24(5).png",
  iroko:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/4062564250205132-image 23iroko.svg",
  netflix:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/2504478378828281-image 23netflix.svg",
  abuja:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/4687169811126528-image 24bedc.svg",
  phcn: "https://sterlinggeneral.blob.core.windows.net/acecoin/7809893940271713-image 24(9).png",
  airtel:
    "https://sterlinggeneral.blob.core.windows.net/acecoin/5459759357780276-image 23.png",
  mtn: "https://sterlinggeneral.blob.core.windows.net/acecoin/9270819525547898-image 23mtn.png",
  glo: "https://sterlinggeneral.blob.core.windows.net/acecoin/45798111866839397-image 23glo.png",
  "9mobile":
    "https://sterlinggeneral.blob.core.windows.net/acecoin/8109292808453397-image 239mobile.svg",
  bedc: "https://sterlinggeneral.blob.core.windows.net/acecoin/1770461422856331-image 24(8).png",
};

const LOCKSTATUS = { LOCKED: "LOCKED", UNLOCKED: "UNLOCKED" };

export {
  USERSTATUSES,
  MESSAGES,
  TRANSACTIONSTATUS,
  MESSAGESTATUS,
  OTPSTATUS,
  CURRENCYTYPE,
  CALLSTATUS,
  CALLTYPE,
  PARTICIPANTSTATUS,
  MESSAGETYPE,
  NOTIFICATIONSTATUS,
  ADDRESSSTATUS,
  OTPTYPE,
  TRANSFERSTATUS,
  TRANSACTIONTYPE,
  BILLCATEGORY,
  BILLIMAGES,
  LOCKSTATUS,
};
