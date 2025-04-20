import { defineComponent } from 'vue';

export const InputError = defineComponent({
    name: 'InputError',
    props: {
        message: {
            type: String,
            required: false,
            default: '',
        },
    },
    setup(props) {
        return () =>
            props.message ? (
                <p class="text-sm text-destructive mt-1">{props.message}</p>
            ) : null;
    },
}); 