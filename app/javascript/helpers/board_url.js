const board_url = location.pathname.split('/')
const board_id =  board_url[board_url.length - 1]

export default board_id;