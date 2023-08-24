<template>
    <div class="modal-profile-claim">
        <b-modal
            v-model="isOpenModal"
            id="modal-success-claim"
            size="sm"
            title="Claim Success"
            hide-footer
            centered
        >
            <template v-slot:modal-header-close>
                <img
                src="@/assets/modal/Union.png"
                height="18"
                />
            </template>
            <div class="d-block text-center">
                <span text-center class="text-profile-claim">{{
                    $t("modals.profile-claim.title")
                }}</span>
            </div>
            <hr />
            <div class="btn-wrapper">
                <b-button
                    class="btn-modal-profile redeem-now"
                    block
                    @click="openModal"
                    >{{ $t("modals.profile-claim.btn") }}</b-button
                >
            </div>
        </b-modal>
        <modal-profile-claim-success v-if="isOpenNextModal" />
    </div>
</template>

<script>
import ModalProfileClaimSuccess from "./ModalProfileClaimSuccess.vue";
export default {
    components: { ModalProfileClaimSuccess },
    name: "modal-profile-claim",
    data: () => {
        return {
            isOpenModal: true,
            isOpenNextModal: false,
        };
    },
    methods: {
        openModal() {
            this.isOpenNextModal = true;
            this.$bvModal.hide("modal-success-claim");
            this.$bvModal.show("modal-success-claim-2");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
div#modal-success-claim___BV_modal_content_ {
    font-family: Montserrat;
    font-style: normal;
    min-width: 400px;
    min-height: 238px;
}

@media (min-width: 576px) {
    .modal-sm {
        max-width: 400px !important;
    }
}
@media only screen and (max-width: 576px) {
  div#modal-success-claim .modal-dialog.modal-sm {
        max-width: 400px !important;
    }
}

h5#modal-success-claim___BV_modal_title_ {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.015em;
}

span.text-profile-claim {
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: #e3e3e3;
    opacity: 0.9;
}

button.btn.btn-modal-profile.redeem-now.btn-secondary.btn-block {
    background: linear-gradient(89.66deg, #962eff 2.15%, #3106bb 99.71%);
    min-width: 352px;
    min-height: 52px;
    border-radius: 6px;
    font-weight: 700 !important;
    font-size: 18px;
    line-height: 36px;
    border: none;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
}

div.btn-wrapper {
    display: grid;
    align-items: center;
    justify-content: center;
}

#modal-success-claim___BV_modal_header_.modal-header {
    position: relative;
    top: 6px;
}

#modal-success-claim___BV_modal_header_.modal-header .close {
   padding-top: 1.35rem !important;
   padding-right: 1.4em !important;
 }

 #modal-success-claim___BV_modal_body_.modal-body {
    position: relative;
    top: 6px;
 }

 #modal-success-claim___BV_modal_header_ button.close {
     opacity: 1 !important;
 }
 
</style>
