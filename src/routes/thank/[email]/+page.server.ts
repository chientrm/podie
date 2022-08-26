import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => ({ email: params.email });
