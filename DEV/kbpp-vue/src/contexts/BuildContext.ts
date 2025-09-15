import { reactive, provide, inject } from 'vue';

type PartType = 'case' | 'plate' | 'pcb' | 'switches' | 'keycaps' | 'stabilizers';

interface SelectedPart {
    id: number;
    type: PartType;
}

interface BuildContext {
    selectedParts: SelectedPart[];
    addPart: (part: SelectedPart) => void;
    removePart: (partId: number) => void;
    clearBuild: () => void;
}

const BuildContextSymbol = Symbol('BuildContext');

export function provideBuildContext() {
    const state = reactive<BuildContext>({
        selectedParts: [],
        addPart(part) {
            if (!state.selectedParts.find(p => p.id === part.id)) {
                state.selectedParts.push(part);
            }
        },
        removePart(partId) {
            state.selectedParts = state.selectedParts.filter(p => p.id !== partId);
        },
        clearBuild() {
            state.selectedParts = [];
        },
    });

    provide(BuildContextSymbol, state);
}

export function useBuildContext() {
    const context = inject<BuildContext>(BuildContextSymbol);
    if (!context) {
        throw new Error('useBuildContext must be used within a BuildContext provider.');
    }
    return context;
}