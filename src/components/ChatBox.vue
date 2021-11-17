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
  on(method: string, callback: (...params: unknown[]) => void): void
}

const listData = ref<Message[]>([])

const messages = instance.service('messages') as Service

const getListMessage = () => {
  messages
    .find()
    .then((res: Message[]) => {
      listData.value = res
    })
    .catch((err) => console.log(err))
}

const handleAddText = () => {
  messages.create({ text: `text ${listData.value.length}` })
}

const handleReset = () => {
  messages.remove(0)
}

messages.on('created', (mess: Message | unknown) => {
  listData.value = [...listData.value, mess as Message]
})

messages.on('removed', () => {
  listData.value = [...[]]
})

onMounted(() => {
  getListMessage()
})
</script>

<template>
  <div>
    <h3>chat box container</h3>
    <q-btn-group>
      <q-btn @click="handleAddText">add message</q-btn>
      <q-btn @click="handleReset"> reset </q-btn>
    </q-btn-group>
    <ul>
      <li v-for="item in listData" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>
