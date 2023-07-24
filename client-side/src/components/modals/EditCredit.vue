<template>
	<div>
		<b-modal
			id="edit-credit"
			ref="modal"
			header-class="headerModal"
			centered
			title="Edit Credit"
			size="l"
			hide-footer
			@shown="handleShowModal"
			@close="onCancel"
		>
			<b-form>
				<b-form-group id="input-group-1" label="Owner name" label-for="input-1">
					<b-form-input id="input-1" v-model="form.owner" />
				</b-form-group>
			</b-form>
			<b-form>
				<b-form-group id="input-group-1" label="CVV" label-for="input-1">
					<b-form-input id="input-1" v-model="form.cvv" />
				</b-form-group>
			</b-form>
			<b-form>
				<b-form-group
					id="input-group-1"
					label="Card Number"
					label-for="input-1"
				>
					<b-form-input id="input-1" v-model="form.card_number" />
				</b-form-group>
			</b-form>
			<b-form>
				<b-form-group
					id="input-group-1"
					label="Expiration Date"
					label-for="input-1"
				>
					<b-form-input id="input-1" v-model="form.expiration_date" />
				</b-form-group>
			</b-form>
			<div style="margin-top: 15px">
				<b-button
					type="button"
					variant="danger"
					class="buttonCancel"
					style="margin-right: 15px"
					@click="onCancel"
				>
					Cancel
				</b-button>
				<b-button
					type="button"
					variant="none"
					class="buttonSubmit"
					@click="onSubmitAddFiliale"
				>
					Submit
				</b-button>
			</div>
		</b-modal>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import editCreditList from "../../utility/Credit/EditCredit";

export default {
	components: {},
	props: ["editCredit"],
	data() {
		return {
			form: {
				_id: null,
				card_number: null,
				cvv: null,
				expiration_date: null,
				owner: null,
			},
		};
	},
	computed: {
		...mapGetters([
			"getCantons",
			"getfreeTeamLeaders",
			"getfreeCoTeamLeaders",
			"getFreeManagers",
		]),
	},

	watch: {},
	mounted() {
		console.log("thissss", this.editCredit);
		this.form = this.editCredit;
	},
	methods: {
		...mapActions(["loadFreeManagers"]),

		handleShowModal() {
			this.loadFreeManagers();
		},
		validateState(name) {
			const { $dirty, $error } = this.$v.filiale[name];
			return $dirty ? !$error : null;
		},
		onSubmitAddFiliale() {
			// console.log('log', this.filiale);
			editCreditList(this.form._id);
		},
		onCancel() {
			this.$refs.modal.hide();
			setTimeout(() => {
				this.$v.$reset();
			}, 0);
			this.$nextTick(() => {
				this.$v.$reset();
			});
			this.onReset();
		},
		getFormattedNumber(n) {
			if (n.isValid == true) {
				this.isPhoneNumberValid = true;
				this.filiale.phone = n.nationalNumber;
				this.filiale.countryCode = n.countryCallingCode;
			} else {
				this.filiale.countryCode = "";
				this.isPhoneNumberValid = false;
				return;
			}
			console.log();
		},
		onReset() {
			this.filiale.name = "";
			this.filiale.gln = "";
			this.filiale.phone = "";
			this.filiale.email = "";
			this.filiale.street = "";
			this.filiale.houseNumber = "";
			this.filiale.doorNumber = "";
			this.filiale.postalCode = "";
			this.filiale.countryState = null;
			this.filiale.countryStateId = null;
			this.filiale.country = "Switzerland";
			this.filiale.city = "";
			this.filiale.phone = "";
			this.filiale.teamLeaderId = null;
			this.filiale.coTeamLeaderId = null;
			this.teamLeader = null;
			this.coTeamLeader = null;
			this.cantons = null;
			this.formSubmitted = false;
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}
.form {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}
.form2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}
.flex-form {
	display: flex;
	flex-direction: column;
}
.uploadButtons {
	display: flex;
	align-items: flex-end;
}
</style>
