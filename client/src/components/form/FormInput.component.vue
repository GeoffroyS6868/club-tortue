<script lang="ts">
export default {
  name: "FormInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    type: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
      default: "formInput",
    },
  },
  methods: {
    inputUpdate(event: Event) {
      if (event) {
        const value: string = (event.target as HTMLInputElement)
          .value as string;
        this.$emit("update:value", value);
      }
    },
  },
};
</script>

<template>
  <div class="form-input">
    <label :for="id">{{ name }}</label>
    <input
      :type="type"
      :id="id"
      @input="inputUpdate"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<style scoped>
.form-input {
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.form-input label {
  width: 100%;
}

.form-input input {
  width: 100%;
  background-color: var(--white-1);
  color: var(--black);
  outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition-duration: 300ms;
}
</style>
