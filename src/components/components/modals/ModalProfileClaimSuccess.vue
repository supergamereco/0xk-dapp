<template>
  <div class="modal-profile-claim-success">
    <b-modal
      v-model="isShowModal"
      id="modal-success-claim-2"
      size="sm"
      title="Claim Success"
      hide-footer
      centered
    >
      <template v-slot:modal-header-close>
        <img src="@/assets/modal/Union.png" height="18" />
      </template>

      <div class="d-block text-center">
        <span>{{ $t("modals.claim-success.title") }}</span>
        <p style="font-size: 24px">{{ time }}</p>
      </div>
      <hr />
      <div class="btn-wrapper-claim-success">
        <b-button
          class="mt-3 btn-modal-profile"
          style="width: 352px; height: 52px; border: 0px"
          block
          @click="openModal"
          >{{ $t("modals.claim-success.btn") }}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import ServiceModals from "@/data/ServiceModals.json";

export default {
  name: "modal-profile-claim-success",
  data: () => {
    return {
      isShowModal: true,
      time: ServiceModals.modals_claim_success.time,
    };
  },
  methods: {
    openModal() {
      this.$bvModal.hide("modal-success-claim-2");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
div#modal-success-claim-2___BV_modal_content_ {
  width: 400px !important;
  height: 261px !important;
  font-family: Montserrat;
  font-style: normal;

  @media (max-width: $tablet) {
    width: 100%;
  }
}

div.btn-wrapper-claim-success {
  display: grid;
  align-items: center;
  justify-content: center;
}

h5#modal-success-claim-2___BV_modal_title_ {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.015em;
}

#modal-success-claim-2___BV_modal_content_.modal-content .modal-header .close,
.modal-content .modal-body .close {
  color: #ffffff !important;
  width: 18px !important;
  height: 18px !important;
  display: contents;
  font-weight: 200;
}

// TODO move to use - btn original style in App.vue
// button.btn.mt-3.btn-modal-profile.btn-secondary.btn-block {
//   background: linear-gradient(89.66deg, #962eff 2.15%, #3106bb 99.71%);
//   min-width: 352px;
//   min-height: 52px;
//   border-radius: 6px;
//   font-weight: 700 !important;
//   font-size: 18px;
//   line-height: 36px;
//   border: none;
// }

.d-block.text-center {
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: #e3e3e3;
  opacity: 0.9;
}
</style>