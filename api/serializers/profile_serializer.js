class ProfileSerializer {
  constructor(Profile) {
    this.returnValue = {
      id: Profile._id,
      one_more_thing: Profile.one_more_thing,
      another_thing: Profile.another_thing,
      user_id: Profile.user_id,
    };
  }

  exclude (keys) {
    const keysArr = keys.split(' ');
    for (const key of keysArr) {
      delete this.returnValue[key];
    }
  }

  include (keys) {
    const keysArr = keys.split(' ');
    for (const [key, _] of Object.entries(this.returnValue)) {
      if (!keysArr.includes(key)) {
        delete this.returnValue[key];
      }
    }
  }

  getJSON () {
    return this.returnValue;
  }
}

module.exports = ProfileSerializer;