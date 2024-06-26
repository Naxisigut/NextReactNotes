import Redis from 'ioredis'

const redis = new Redis()

const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

type NoteData = {
  title: string,
  content: string,
  updateTime: string
}

/* 获取笔记列表 */
export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  const allData = await redis.hgetall("notes")
  const notes = Object.entries(allData)
  const processdNotes = notes.map(([noteId, noteVal]) => {
    const note = JSON.parse(noteVal)
    const newItem: [string, NoteData] = [noteId, note]
    return newItem
  })
  
  return processdNotes
}

/* 新增笔记 */
export async function addNote(data: string) {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, data);
  return uuid
}


/* 更新笔记 */
export async function updateNote(uuid: string, data: string) {
  await redis.hset("notes", uuid, data);
}


/* 获取笔记数据 */
export async function getNote(uuid: string) {
  const noteData = await redis.hget("notes", uuid)
  return noteData ? JSON.parse(noteData) as NoteData : null;
}


/* 删除笔记 */
export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid)
}

export default redis