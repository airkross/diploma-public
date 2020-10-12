<template>
  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="Submit Your Name"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <slot></slot>
  </b-modal>
</template>