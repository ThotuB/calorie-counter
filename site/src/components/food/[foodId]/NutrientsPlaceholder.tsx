import Button from '@components/buttons/Button'

const NutrientsPlaceholder = () => (
    <div className="flex flex-col w-full max-w-5xl gap-6 rounded-2xl p-4 bg-dark text-white">
        <div className="flex flex-col items-center gap-1">
            <div className='w-1/4 h-16 bg-white transition-opacity animate-pulse' />
            <div className='w-1/6 h-6 bg-white transition-opacity animate-pulse' />
        </div>
        <div className="flex justify-between">
            <div className="flex gap-4 items-center">
                <div className='w-24 h-8 bg-white transition-opacity animate-pulse' />
                {/* <Toggle.Group
                        value={selected}
                        onChange={setSelected}
                    >
                        <Toggle.Button value="100">
                            100 {servingSizeUnit}
                        </Toggle.Button>
                        <Toggle.Button value="serving">
                            {servingSize} {servingSizeUnit}
                        </Toggle.Button>
                        <Toggle.Button value="input">
                            <input className='w-16 mr-2 bg-transparent text-right'
                                title="Input Portion"
                                type='number'
                                value={inputPortion}
                                onChange={handleInputChange}
                            />
                            {servingSizeUnit}
                        </Toggle.Button>
                    </Toggle.Group> */}
            </div>
            <Button className='flex gap-3 transition-opacity animate-pulse'>
                <div className='w-6 h-6' />
                <div className='w-16 h-6' />
                {/* <PlusIcon className='w-6' /> Add Food */}
            </Button>
        </div>
        <div className="flex flex-col gap-3">
            <NutrientElemPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientElemPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
            <NutrientSubPlaceholder />
        </div>
    </div>
)

export default NutrientsPlaceholder

const NutrientPlaceholder = () => (
    <div className="flex w-full justify-between py-3 px-7">
        <div className='w-16 h-8 bg-darker transition-opacity animate-pulse' />
        <div className="flex flex-row-reverse w-52 gap-5">
            <div className="w-16 h-8 bg-darker transition-opacity animate-pulse" />
            <div className="w-28 h-8 bg-darker transition-opacity animate-pulse" />
        </div>
    </div>
)

const NutrientElemPlaceholder = () => (
    <div className="bg-primary rounded-xl">
        <NutrientPlaceholder />
    </div>
)

const NutrientSubPlaceholder = () => (
    <div className="flex">
        <div className="w-1/12 flex justify-center">
            <div className="bg-darker w-2 h-8 rounded-t-full rounded-bl-full" />
            <div className="bg-darker w-7/12 h-2 self-center rounded-r-full" />
        </div>
        <div className="bg-purple-200 w-full rounded-xl">
            <NutrientPlaceholder />
        </div>
    </div>
)