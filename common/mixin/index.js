import { mapGetters, mapMutations } from 'vuex'
export const skinMixin = {
	computed: {
		...mapGetters(['skinMode', 'skinColor'])
	},
	methods: {
		...mapMutations(['changeSkin'])
	}
}