class AlertsSerializer {
  constructor(Alerts) {
    this.returnValue = {
      id: Alerts._id,
      timestamp: Alerts.timestamp,
      title: Alerts.title,
      status: Alerts.status,
      user_id: Alerts.user_id,
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

module.exports = AlertsSerializer;