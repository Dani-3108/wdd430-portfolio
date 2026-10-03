'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/lib/actions';

const initialState: State = { message: null, errors: {} };

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    return (
        <form className="project-form" action={formAction}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" aria-describedby="title-error" required />
            <div id="title-error" aria-live="polite" aria-atomic="true">
                {state.errors?.title?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={4} aria-describedby="description-error" required />
            <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>

            <label htmlFor="type">Type</label>
            <select id="type" name="type" defaultValue="" aria-describedby="type-error" required>
                <option value="" disabled>Select a type</option>
                <option value="opensource">Open Source</option>
                <option value="school">School</option>
            </select>
            <div id="type-error" aria-live="polite" aria-atomic="true">
                {state.errors?.type?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>
            <label htmlFor="technologies">Technologies (comma-separated)</label>
            <input id="technologies" name="technologies" aria-describedby="technologies-error" required />
            <div id="technologies-error" aria-live="polite" aria-atomic="true">
                {state.errors?.technologies?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>

            <label htmlFor="yearCompleted">Year Completed</label>
            <input id="yearCompleted" name="yearCompleted" type="number" min="2000" max="2099" aria-describedby="yearCompleted-error" required />
            <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                {state.errors?.yearCompleted?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>
            <label htmlFor="link">Link (optional)</label>
            <input id="link" name="link" type="url" aria-describedby="link-error" />
            <div id="link-error" aria-live="polite" aria-atomic="true">
                {state.errors?.link?.map((error) => (
                    <p key={error} className="field-error">{error}</p>
                ))}
            </div>
            {state.message ? <p className="field-error">{state.message}</p> : null}
            <button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Project'}
            </button>
        </form>
    );
}