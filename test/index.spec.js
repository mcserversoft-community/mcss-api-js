const { MCSS } = require('../dist/index');

describe('MCSS', ()=>{
    it('creates a new instance', ()=>{
        const mcss = new MCSS();
        expect(mcss).toBeInstanceOf(MCSS);
    });
    it('creates a new instance with options', ()=>{
        const mcss = new MCSS('127.0.0.1', 25560, 'rWx2ReZYc2tA2ShzIVcYqSl2XS7PvrLOwg36IGlOJNkO2HuQZE9J0sXn48C16PNDROuVqWYUMrrJ4TmLualtxVeBLxPfwAjxUPGxohASNwOKR2cgMC464Z8x')
        expect(mcss).toBeInstanceOf(MCSS);
        expect(mcss.ip).toBe('192.168.0.24')
        expect(mcss.port).toBe(25560)
    });
})