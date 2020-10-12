<template>
  <div class="blockchain-card">
    <b-alert show class="mb-3 d-flex justify-content-between align-items-center">
      <div class="left">
        <div class="d-flex align-items-center">
          <h6 class="mb-0">Идентификатор Блокчейна:</h6>
          {{ blockchainItem.id }}
        </div>
        <div class="d-flex align-items-center">
          <h6 class="mb-0">Название блокчейна:</h6>
          {{ blockchainItem.nameSend }}
        </div>
      </div>
      <div class="right">
          <nuxt-link class="btn btn-success" :to="`/create/block`">
              Добавить блок
          </nuxt-link>
          <nuxt-link class="btn btn-primary" :to="`/blockchains/${blockchainItem.id}`">
              Детальнее
          </nuxt-link>
      </div>
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    blockchainItem: {
      type: Object,
      default: () => null,
    },
  },
};
</script>

<style scoped>
.blockchain-card {
  width: 100%;
}
</style>