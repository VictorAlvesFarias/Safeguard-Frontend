import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function Form({children, submit,className}) {

    return (
        <form onSubmit={submit} className={className} action="#">
            {children}
        </form>
    )
}

export default Form