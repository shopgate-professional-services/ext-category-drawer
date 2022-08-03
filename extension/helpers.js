/**
   * Test for NOT undefined null or empty string
   * @param {*} subject Value to test
   * @return {boolean}
   */
  const hasValue = (subject) => (
    !(typeof subject === 'undefined' || subject === null || subject === '')
  )
  
module.exports = {
    hasValue 
  }
  