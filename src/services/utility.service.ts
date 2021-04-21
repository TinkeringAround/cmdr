import uuid from 'uuid';

export const UtilityService = {
  getUuid: () => {
    return uuid.v1();
  }
}
