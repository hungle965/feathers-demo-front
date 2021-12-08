<script setup lang="ts">
import instance from 'src/helper/feathers'
import { onMounted, ref } from 'vue'

interface Message {
  id: number
  text: string
}

interface Service {
  reset: () => Promise<Message[]>
  find: () => Promise<Message[]>
  create(mess: Pick<Message, 'text'>): void
  remove(id: number): void
  on(method: string, callback: (message?: Message) => void): void
}

const listData = ref<Message[]>([])
const text = ref<string>('')
const chatBoxRef = ref<HTMLElement>()

const messages = instance.service('messages') as Service

const handleAddText = () => {
  if (text.value) messages.create({ text: text.value })
  text.value = ''
}

messages.on('created', (mess?: Message) => {
  console.log('create: ', mess)
  if (mess) listData.value = [...listData.value, mess]
  scrollEndOfChatBox()
})

messages.on('removed', (res?: Message) => {
  console.log('removed')
  if (!res) throw new Error(res)
  updateDate()
})

const scrollEndOfChatBox: () => void = () => {
  setTimeout(() => {
    if (chatBoxRef.value)
      chatBoxRef.value.scrollTo({
        top: chatBoxRef.value.scrollHeight,
        behavior: 'smooth'
      })
  }, 0)
}

const onSubmitText = () => {
  handleAddText()
}

const handleMessClick = (item: Message) => {
  messages.remove(item.id)
}

const getListMessage: () => Promise<Message[]> = async () => {
  try {
    const res = await messages.find()
    return res
  } catch (error) {
    throw error
  }
}

const updateDate: () => void = async () => {
  listData.value = await getListMessage()
}

onMounted(() => {
  updateDate()
  scrollEndOfChatBox()
})
</script>

<template>
  <div class="container">
    <h4>chat box container</h4>
    <div id="chatBox" ref="chatBoxRef" class="chat-box">
      <div v-for="item in listData" :key="item.id" class="chat-item">
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="[item.text]"
          sent
        />
        <q-icon name="delete" @click="handleMessClick(item)" />
      </div>
    </div>
    <form @submit="onSubmitText">
      <q-btn-group class="form-group">
        <q-input borderless v-model="text" />
        <q-btn @click="handleAddText"><q-icon name="send" /></q-btn>
      </q-btn-group>
    </form>
  </div>
</template>

<style lang="scss">
.container {
  padding: 80px;
  margin: auto;

  width: 100%;
  max-width: 500px;

  .q-field__native,
  .q-field__prefix,
  .q-field__suffix,
  .q-field__input {
    padding: 20px;
    width: 100%;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .chat-box {
    height: 300px;
    overflow: auto;
  }

  .chat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .q-message {
      width: 100%;
    }

    &:hover {
      .q-icon {
        display: block;
      }
    }

    .q-icon {
      display: none;
      margin: 4px;
      cursor: pointer;
    }
  }
}
</style>
