<template>
	<div>
		<body class="container">
			<h4>Owner: {{ credit.owner }}</h4>
			<div>
				<div class="credits">
					<img v-if="src" :src="src" style="max-height: 150px" />
					<p>
						CVV: <b> {{ credit.cvv }} </b>
					</p>
					<p>
						Card Number: <b> {{ credit.card_number }}</b>
					</p>
					<p>
						Expiration Date: <b> {{ credit.expiration_date }}</b>
					</p>

					<div class="btns">
						<b-button
							variant="danger"
							type="button"
							style="margin-right: 5px"
							@click="removeCredit"
							>Delete</b-button
						>
						<b-button
							v-b-modal.edit-credit
							type="button"
							@click="editClient(credit)"
						>
							Edit
						</b-button>
					</div>
				</div>
				<hr />
			</div>
		</body>
		<EditCredit :edit-credit="credit" />
	</div>
</template>

<script>
import deleteCredit from "../utility/Credit/DeleteCredit";
import getCreditList from "../utility/Credit/GetCreditList";
// import editCreditList from "../utility/Credit/EditCredit";
import EditCredit from "../components/modals/EditCredit.vue";
export default {
	props: {
		credit: Object,
	},
	components: {
		EditCredit,
	},
	computed: {
		//
		credits() {
			return this.$store.state.credits.credits;
		},
	},
	methods: {
		async removeCredit() {
			await deleteCredit(this.credit._id);

			const result = await getCreditList();
			this.$store.dispatch("fetchCredits", result);
		},
		async editClient(value) {
			console.log(value);
			// await editCreditList(value );
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	h2 {
		text-align: center;
		align-self: center;
	}
}

.posts {
	display: flex;
	flex-direction: row;
	padding: 15px;
	margin-right: 5%;
	margin-left: 5%;
	width: 90%;
	justify-content: space-between;
	flex-wrap: wrap;

	@media (max-width: 700px) {
		.posts {
			flex-direction: row;
		}

		img {
			display: none;
		}

		h5 {
			margin-left: 5%;
			margin-right: 3%;
			padding: 10px;
			text-align: center !important;
			width: 100% !important;
		}
	}

	img {
		width: 35%;
		height: 100%;
	}

	h5 {
		margin-left: 5%;
		margin-right: 3%;
		font-size: 28px;
		padding: 10px;
		text-align: center;
		width: 15%;
	}

	p {
		margin-top: 3%;
		font-size: 23px;
		margin-bottom: 3%;
	}

	@media (max-width: 700px) {
		.btns {
			width: 190% !important;
			.link {
				width: 150%;
			}
		}
	}

	.btns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15px;
		width: 30%;

		.link {
			padding: 15px;
		}

		button {
			background-color: black;
			border: none;
			color: white;
			padding: 15px 32px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			margin-bottom: 3%;
			margin-top: 3%;
			margin-left: 5%;
		}
	}
}
</style>
