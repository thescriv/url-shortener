import * as Mockdate from 'mockdate'

function mockDate() {
  Mockdate.set(new Date('2020-02-09T10:30:00.000Z'))
}

function restoreDate() {
  Mockdate.reset()
}

export { mockDate, restoreDate }
