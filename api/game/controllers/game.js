"use strict";

module.exports = {
  populate: (ctx) => {
    console.log("init");
    ctx.send({ ok: true });
  },
};
