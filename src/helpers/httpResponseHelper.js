const _status = (res, status, r) => {
  res.status(status).json(r || {});
};

const error = (res, e) => {
  if (e && e.status) {
    _status(res, e.status, e);
  } else {
    _status(res, 500, e);
  }
};

const created = (res, r) => {
  _status(res, 201, r);
};

const ok = (res, r) => {
  if (!r) {
    let e = { status: 404, menssage: "Not found." };
    _status(res, e.status, e);
  } else {
    _status(res, 200, r);
  }
};

const notFound = (res, r) => {
  _status(res, 404, r);
};

module.exports = { error, created, ok, notFound };
