import { DateTime } from "luxon";
import moment from "moment";

export function remainingDay(date: DateTime) {
      const dateOne = moment(date)
      const result = dateOne.diff(moment(), 'minute')
      return Math.round(((result / 60) / 24));
}